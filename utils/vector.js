'use strict';

function vec(x, y) {
	return { x: x, y: y };
}

vec.replicate = function(s) {
	return vec(s, s);
};

vec.clone = function(v) {
	return vec(v.x, v.y);
}

vec.add = function(v1, v2) {
	return vec(v1.x + v2.x, v1.y + v2.y);
}
vec.sub = function(v1, v2) {
	return vec(v1.x - v2.x, v1.y - v2.y);
}

vec.neg = function(v) {
	return vec(-v.x, -v.y);
}
vec.scale = function(v, s) {
	return vec(v.x * s, v.y * s);
}

vec.mod = function(v, s) {
	return vec(v.x % s, v.y % s);
}

vec.mul = function(v1, v2) {
	return vec(v1.x * v2.x, v1.y * v2.y);
}

vec.div = function(v1, v2) {
	return vec(v1.x / v2.x, v1.y / v2.y);
}

vec.sqlen = function(v) {
	return v.x * v.x + v.y * v.y;
}

vec.len = function(v) {
	return Math.sqrt(vec.sqlen(v));
}

vec.norm = function(v) {
	let l = vec.len(v);
	if (l < 0.00001) {
		return vec(0, 0);
	}
	return vec.scale(v, 1.0 / l);
}

vec.dir = function(from, to) {
	return vec.norm(vec.vsub(to, from));
}

vec.lerp = function(v1, v2, a) {
	return vec.add(vec.scale(v1, 1 - a), vec.scale(v2, a));
}

vec.eq = function(v1, v2) {
	return v1.x === v2.x && v1.y === v2.y;
}

vec.dot = function(v1, v2) {
	return v1.x * v2.x + v1.y * v2.y;
}

vec.dist = function(v1, v2) {
	return vec.len(vec.sub(v2, v1));
}

vec.map = function(v, func) {
	return vec(func(v.x), func(v.y));
}

vec.flip = function(v) {
	return vec(v.y, v.x);
}

module.exports = vec;