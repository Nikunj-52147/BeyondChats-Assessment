<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Str; 

class ArticleController extends Controller
{
    // GET /api/articles
    public function index()
    {
        return response()->json(
            Article::orderBy('created_at', 'desc')->get()
        );
    }

    // GET /api/articles/{id}
    public function show($id)
    {
        $article = Article::findOrFail($id);
        return response()->json($article);
    }

    // POST /api/articles
    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string',
        'content' => 'required|string',
         'references' => 'nullable|array',
    ]);

    // Automatically generate source_url
    $slug = Str::slug($validated['title']); // converts title to URL-friendly slug
    $validated['source_url'] =
  "https://beyondchats.com/blogs/{$slug}-" . time();

    $article = Article::create($validated); // save in DB

    return response()->json($article, 201); // return the new article
}


    // PUT /api/articles/{id}
    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $data = $request->validate([
            'title'      => 'sometimes|string',
            'content'    => 'sometimes|string',
            'source_url' => 'sometimes|url|unique:articles,source_url,' . $article->id,
        ]);

        $article->update($data);

        return response()->json($article);
    }

    // DELETE /api/articles/{id}
    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();

        return response()->json([
            'message' => 'Article deleted successfully'
        ]);
    }
}
