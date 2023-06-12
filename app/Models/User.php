<?php

namespace App\Models;

use App\Enums\Role;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'role' => Role::class,
    ];

    public function hasRole(Role $needle): bool
    {
        return $this->roles()->contains(
            fn (Role $role) => $role === $needle
        );
    }

    public function roles(): Collection
    {
        return DB::table('role_user')
            ->where('user_id', $this->id)
            ->get()
            ->pluck('role')
            ->map(fn (string $role) => Role::from($role));
    }

    /**
     * @param Collection<Role> | Role $roles
     * @return void
     */
    public function addRoles(Collection | Role $roles): void
    {
        if ($roles instanceof Role) {
            $roles = collect([$roles]);
        }

        foreach ($roles as $role) {
            if (! $this->hasRole($role)) {
                DB::table('role_user')->insert([
                    'user_id' => $this->id,
                    'role' => $role->value,
                ]);
            }
        }
    }
}
