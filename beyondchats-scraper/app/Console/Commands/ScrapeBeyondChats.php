<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;

class ScrapeBeyondChats extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape 5 oldest articles from BeyondChats';

    public function handle()
    {
        $client = new Client([
            'timeout' => 20,
            'headers' => [
                'User-Agent' => 'Mozilla/5.0'
            ]
        ]);

        // Step 1: Fetch blogs page
        $html = (string) $client->get('https://beyondchats.com/blogs/')->getBody();
        $crawler = new Crawler($html);

        // Step 2: Get last page link
        $pagination = $crawler->filter('a.page-numbers');

        if ($pagination->count() === 0) {
            $this->error('Pagination not found');
            return;
        }

        $lastPageUrl = $pagination->last()->attr('href');

        // Step 3: Fetch last page
        $lastHtml = (string) $client->get($lastPageUrl)->getBody();
        $lastCrawler = new Crawler($lastHtml);

        // Step 4: Extract articles
        $count = 0;

        $lastCrawler->filter('article')->each(function (Crawler $node) use ($client, &$count) {

            if ($count >= 5) {
                return;
            }

            $titleNode = $node->filter('h2 a');
            if ($titleNode->count() === 0) {
                return;
            }

            $title = trim($titleNode->text());
            $url   = $titleNode->attr('href');

            // Skip duplicates
            if (Article::where('source_url', $url)->exists()) {
                return;
            }

            // Step 5: Fetch full article
            $articleHtml = (string) $client->get($url)->getBody();
            $articleCrawler = new Crawler($articleHtml);

            $content = '';
            $articleCrawler->filter('article p')->each(function (Crawler $p) use (&$content) {
                $content .= trim($p->text()) . "\n\n";
            });

            if (empty(trim($content))) {
                return;
            }

            // Step 6: Save to DB
            Article::create([
                'title'      => $title,
                'content'    => trim($content),
                'source_url' => $url,
            ]);

            $count++;
            $this->info("Saved: {$title}");
        });

        $this->info('✅ Scraping completed successfully');
    }
}
