<?php

// header('Access-Control-Allow-Origin: http://127.0.0.1:3000');
// header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
// header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token");

use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\Auth\ApiAuthController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertyController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Auth routes
Route::group([
    'prefix' => 'auth'
], function ($router) {
    Route::post('register', [RegisteredUserController::class, 'register']);
    Route::group(['middleware' => ['api'],], function(){
        Route::post('forgot-password', [PasswordResetLinkController::class, 'store']);
        Route::patch('new-password', [NewPasswordController::class, 'store']);
        Route::post('verify-email', [EmailVerificationNotificationController::class, 'store']);

        Route::post('login', [ApiAuthController::class, 'login']);
        Route::post('logout', [ApiAuthController::class, 'logout']);
        Route::post('refresh', [ApiAuthController::class, 'refresh']);
        Route::post('me', [ApiAuthController::class, 'me']);
    });

});



// Route::get('/admin', function () {
//     return view('admin.index');
// })->middleware(['auth', 'verified', 'role:admin'])->name('admin.index');


Route::middleware(['auth:api', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Properties routes
Route::group(
    ['middleware' => 'auth:api',],
    function () {
        Route::group(['prefix' => 'properties'], function () {
            Route::post('/', [PropertyController::class, 'store']);
            Route::get('/', [PropertyController::class, 'index']);
            Route::get('/{property}', [PropertyController::class,'show']);
            Route::patch('/{property}', [PropertyController::class, 'update']);
            Route::delete('/{property}', [PropertyController::class, 'destroy']);
        });

        Route::group(['prefix' => 'applicants'], function () {
            Route::post('/', [ApplicantController::class, 'store']);
            Route::get('/', [ApplicantController::class, 'index']);
            Route::get('/my-applications', [ApplicantController::class, 'my_applications']);
            // Route::get('/my-applications-by-name', [ApplicantController::class, 'myPropertiesByName']);
            Route::get('/{applicant}', [ApplicantController::class,'show']);
            Route::patch('/{applicant}', [PropertyController::class, 'update'])->middleware('role:user');
            Route::delete('/{applicant}', [PropertyController::class, 'destroy'])->middleware('role:admin');
        });
    }
);

