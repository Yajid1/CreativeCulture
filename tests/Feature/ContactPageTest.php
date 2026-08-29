<?php

test('contact page returns a successful response', function () {
    $response = $this->get(route('contact'));

    $response->assertOk();
});
