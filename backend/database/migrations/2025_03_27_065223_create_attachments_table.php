<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

Schema::create('attachments', function (Blueprint $table) {
    $table->id();
    $table->foreignId('folder_id')->constrained()->cascadeOnDelete();
    $table->string('title'); 
    $table->string('type');
    $table->string('original_name'); // Original filename
    $table->string('storage_path'); // Path in storage
    $table->string('mime_type');
    $table->unsignedInteger('size');
    $table->string('tenant_id')->nullable();
    $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attachments');
    }
};
