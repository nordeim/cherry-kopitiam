<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            [
                'name' => 'Tiong Bahru',
                'slug' => 'tiong-bahru',
                'address' => '55 Tiong Bahru Road, #01-55',
                'operating_hours' => ['daily' => '7:00 AM - 8:00 PM'],
                'features' => ['Full Breakfast Menu', 'Wheelchair Accessible', 'Parking Available'],
                'is_active' => true,
            ],
            [
                'name' => 'Joo Chiat',
                'slug' => 'joo-chiat',
                'address' => '48 Joo Chiat Road',
                'operating_hours' => ['daily' => '8:00 AM - 9:00 PM'],
                'features' => ['Peranakan Decor', 'Instagram Famous', 'Live Music (Weekends)'],
                'is_active' => true,
            ],
            [
                'name' => 'Jurong Lake',
                'slug' => 'jurong',
                'address' => '101 Jurong Lake Street, #01-12',
                'operating_hours' => ['daily' => '7:30 AM - 10:00 PM'],
                'features' => ['Co-working Space', 'Fast Charging', 'Green Terrace'],
                'is_active' => true,
            ],
        ];

        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}
