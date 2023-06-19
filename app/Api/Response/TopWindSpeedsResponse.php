<?php

namespace App\Api\Response;

use Illuminate\Support\Collection;

class TopWindSpeedsResponse extends ApiResponse
{
    public function getRecords(): Collection
    {
        return collect($this->json);
    }
}
