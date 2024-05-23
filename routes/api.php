<?php

use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\Auth\ApiAuthController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertyController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Auth routes
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [ApiAuthController::class, 'login']);
    Route::post('logout', [ApiAuthController::class, 'logout']);
    Route::post('refresh', [ApiAuthController::class, 'refresh']);
    Route::post('me', [ApiAuthController::class, 'me']);
});

Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('register', [RegisteredUserController::class, 'register']);
});


Route::get('/admin', function () {
    return view('admin.index');
})->middleware(['auth', 'verified', 'role:admin'])->name('admin.index');


Route::middleware('auth')->group(function () {
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
            Route::get('/{applicant}', [ApplicantController::class,'show']);
            Route::patch('/{applicant}', [PropertyController::class, 'update'])->middleware('role:user');
            Route::delete('/{applicant}', [PropertyController::class, 'destroy'])->middleware('role:admin');
        });
    }
);
/**
 * ApplicantController
 */
