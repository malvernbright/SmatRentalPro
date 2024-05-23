<?php

use App\Http\Controllers\Auth\ApiAuthController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertyController;

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

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
/**
 * middleware(['auth', 'verified', 'role:admin'])->
 * Route::group([
 *  'middleware'=>'api',
 *  'prefix'=>'auth'
 *], function($router){
 *  Route::post('login', [AuthController::class, 'login']);
 *  Route::post('logout', [AuthController::class, 'logout']);
 *   Route::post('refresh', [AuthController::class, 'refresh']);
 *   Route::post('me', [AuthController::class, 'me']);
 *});

 *Route::group(['prefix' => 'auth'], function ($router) {
 *   Route::post('register', [AuthController::class, 'register']);
 *});
 */
Route::group(['middleware' => ['auth:api']], function () {

    Route::group(['prefix' => 'properties', 'middleware' => 'api'], function () {
        Route::get('/', [PropertyController::class, 'index']);
    });
});
Route::group(
    [
        'middleware' => 'api',
        'prefix' => 'properties'
    ],
    function () {

        Route::middleware('role:admin')->group(function () {
            Route::post('/', [PropertyController::class, 'store']);
            Route::patch('/{property}', [PropertyController::class, 'update']);
            Route::delete('/{property}', [PropertyController::class, 'destroy']);
        });
    }
);
