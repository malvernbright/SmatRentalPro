<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        try {
            if ($request->user()->hasVerifiedEmail()) {
                return response()->json(['message'=>'Your email is verified']);
            }

            $request->user()->sendEmailVerificationNotification();

            return response()->json(['status' => 'verification-link-sent']);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['message'=>'Your authentication cannot be verified. Invalid token'], 401);
        }
    }
}
