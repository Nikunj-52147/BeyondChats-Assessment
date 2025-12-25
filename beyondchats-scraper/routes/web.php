<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('welcome');
});

/*
|--------------------------------------------------------------------------
| Article CRUD APIs (REST)
|--------------------------------------------------------------------------
*/

Route::get('/api/articles', [ArticleController::class, 'index']);
Route::get('/api/articles/{id}', [ArticleController::class, 'show']);
Route::post('/api/articles', [ArticleController::class, 'store']);
Route::put('/api/articles/{id}', [ArticleController::class, 'update']);
Route::delete('/api/articles/{id}', [ArticleController::class, 'destroy']);
