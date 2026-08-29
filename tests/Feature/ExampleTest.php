<?php

test('home page returns a successful response', function () {
    $this->get(route('home'))->assertOk();
});

test('subsektor page returns a successful response', function () {
    $this->get(route('subsektor'))->assertOk();
});

test('berita page returns a successful response', function () {
    $this->get(route('berita'))->assertOk();
});

test('artikel page returns a successful response', function () {
    $this->get(route('artikel'))->assertOk();
});

test('contact page returns a successful response', function () {
    $this->get(route('contact'))->assertOk();
});
