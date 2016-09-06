'use strict';

/**
 * Module dependencies
 */

var EventEmitter = require('events').EventEmitter;

/**
 * Expose
 */
class File extends EventEmitter {
  constructor(name, path, type) {
    super();
    this.name = name;
    this.path = path;
    this.type = type;
    this.size = 0;
    this.root = null;
    this.id = null;
    this.lastModified = new Date;
  }
}

module.exports = exports = File;
