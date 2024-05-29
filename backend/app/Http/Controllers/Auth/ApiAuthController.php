<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ApiAuthController extends Controller
{


    // public function __construct()
    // {
    //     $this->middleware('auth:api')->except('login');
    // }



   /**
     * Get a JWT via given credentials
     *
     * @return \Illuminate\Http\JsonResponse
     */

     public function login()
     {
        $credentials = request(['email', 'password']);

        if(! $token=auth()->attempt($credentials)){
            return response()->json(['error'=>'Unauthorized'], 401);
        }
       else if(! auth()->user()->hasVerifiedEmail()){
            return response()->json(
                [
                    'error'=>'Unauthorized',
                    'message'=>"You are not a verified user, please verify your email first!"
                ], 401);
        }
        return $this->respondWithToken($token);
     }

     /**
      * Get the authenticated User
      *
      * @return \Illuminate\Http\JsonResponse
      */
      public function me()
      {
        $user = Auth::user();
        $roles = $user->roles;
        return response()->json(['user'=>auth()->user(), 'roles'=>$roles]);
      }

      /**
       * Log the User out (Invalidate the token)
       *
       * @return \Illuminate\Http\JsonResponse
       */
      public function logout()
      {
        auth()->logout();
        return response()->json(['message'=>'Successfully logged out']);
      }

      /**
       * Resfresh token
       *
       * @return \Illuminate\Http\JsonResponse
       */
      public function refresh()
      {
        return $this->respondWithToken(auth()->refresh());
      }

      /**
       * Get the token array structure
       *
       * @param string $token
       *
       * @return \Illuminate\Http\JsonResponse
       */
      public function respondWithToken($token)
      {
        $user = Auth::user();
        return response()->json([
            'access_token'=>$token,
            'token_type'=>'bearer',
            'expires_in'=>auth()->factory()->getTTL()*60,
            'roles' => $user->roles,
        ]);
      }
}
