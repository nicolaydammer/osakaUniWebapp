<?php

namespace App\Enums;

enum Role: string
{
    case USER = 'user';
    case ADMIN = 'admin';

    public function label(): string
    {
        return self::labels()[$this->value];
    }

    public static function labels(): array
    {
        return [
            'user' => __('User'),
            'admin' => __('Admin'),
        ];
    }
}
