<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustHosts as Middleware;

/**
 * @return array<int, string|null>
 */
public function hosts()
{
    return [
        $this->allSubdomainsOfApplicationUrl(),
    ];
}
