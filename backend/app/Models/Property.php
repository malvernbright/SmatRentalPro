<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illumminate\Database\Eloquent\Relations\BelongsToMany;

class Property extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'price', 'property_image', 'tenure', 'size', 'owner_id'];
    // public function user() : BelongsTo {
    //     return $this->belongsTo(User::class);
    // }

    public function applicants(){
        return $this->belongsToMany(Applicant::class);
    }
}
