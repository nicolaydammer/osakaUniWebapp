<?php

namespace App\Api\Response;

use Illuminate\Support\Collection;

class TemperatureAndDownfallResponse extends ApiResponse
{
    public function getRecords(): Collection
    {
        return collect($this->json);
    }
}
