const express = require('express');
express().use(express.static(__dirname + '/build')).listen(5000, () => console.log(' client up on 5000'));
