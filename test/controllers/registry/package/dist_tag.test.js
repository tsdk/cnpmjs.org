/**!
 * cnpmjs.org - test/controllers/registry/package/dist_tag.test.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var request = require('supertest');
var mm = require('mm');
var pedding = require('pedding');
var should = require('should');
var app = require('../../../../servers/registry');
var utils = require('../../../utils');
var config = require('../../../../config');

describe('controllers/registry/package/dist_tag.test.js', function () {
  afterEach(mm.restore);

  describe('index()', function () {
    before(function (done) {
      done = pedding(2, done);
      var pkg = utils.getPackage('dist_tag_test_module_index', '1.0.1', utils.admin);
      request(app.listen())
      .put('/' + pkg.name)
      .set('authorization', utils.adminAuth)
      .send(pkg)
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .put('/-/package/' + pkg.name + '/dist-tags/next')
        .set('authorization', utils.adminAuth)
        .set('content-type', 'application/json')
        .send(JSON.stringify('1.0.1'))
        .expect(201, done);
      });

      var pkg2 = utils.getPackage('@cnpmtest/dist_tag_test_module_index', '1.0.1', utils.admin);
      request(app.listen())
      .put('/' + pkg2.name)
      .set('authorization', utils.adminAuth)
      .send(pkg2)
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .put('/-/package/' + pkg2.name + '/dist-tags/next')
        .set('authorization', utils.adminAuth)
        .set('content-type', 'application/json')
        .send(JSON.stringify('1.0.1'))
        .expect(201, done);
      });
    });

    it('should get normal pakcage tags', function (done) {
      request(app.listen())
      .get('/-/package/dist_tag_test_module_index/dist-tags')
      .expect(200)
      .expect({
        latest: '1.0.1',
        next: '1.0.1'
      }, done);
    });

    it('should get scoped pakcage tags', function (done) {
      request(app.listen())
      .get('/-/package/@cnpmtest/dist_tag_test_module_index/dist-tags')
      .expect(200)
      .expect({
        latest: '1.0.1',
        next: '1.0.1'
      }, done);
    });

    it('should 404 when package not exists', function (done) {
      request(app.listen())
      .get('/-/package/not-exists/dist-tags')
      .expect(404)
      .expect({
        error: 'not_found',
        reason: 'document not found'
      }, done);
    });
  });

  describe('set()', function () {
    before(function (done) {
      done = pedding(2, done);
      var pkg = utils.getPackage('dist_tag_test_module_set', '1.0.1', utils.admin);
      request(app.listen())
      .put('/' + pkg.name)
      .set('authorization', utils.adminAuth)
      .send(pkg)
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .put('/-/package/' + pkg.name + '/dist-tags/next')
        .set('authorization', utils.adminAuth)
        .set('content-type', 'application/json')
        .send(JSON.stringify('1.0.1'))
        .expect(201, done);
      });

      var pkg2 = utils.getPackage('@cnpmtest/dist_tag_test_module_set', '1.0.1', utils.admin);
      request(app.listen())
      .put('/' + pkg2.name)
      .set('authorization', utils.adminAuth)
      .send(pkg2)
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .put('/-/package/' + pkg2.name + '/dist-tags/next')
        .set('authorization', utils.adminAuth)
        .set('content-type', 'application/json')
        .send(JSON.stringify('1.0.1'))
        .expect(201, done);
      });
    });

    it('should 400 when set not exists version', function (done) {
      request(app.listen())
      .put('/-/package/dist_tag_test_module_set/dist-tags/next')
      .set('authorization', utils.adminAuth)
      .set('content-type', 'application/json')
      .send(JSON.stringify('2.0.1'))
      .expect({
        error: 'version_error',
        reason: 'dist_tag_test_module_set@2.0.1 not exists'
      })
      .expect(400, done);
    });

    it('should 201 set exists tag', function (done) {
      request(app.listen())
      .put('/-/package/dist_tag_test_module_set/dist-tags/exists')
      .set('authorization', utils.adminAuth)
      .set('content-type', 'application/json')
      .send(JSON.stringify('1.0.1'))
      .expect({
        ok: 'dist-tags updated'
      })
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .put('/-/package/dist_tag_test_module_set/dist-tags/exists')
        .set('authorization', utils.adminAuth)
        .set('content-type', 'application/json')
        .send(JSON.stringify('1.0.1'))
        .expect({
          ok: 'dist-tags updated'
        })
        .expect(201, done);
      });
    });
  });

  describe('destroy()', function () {
    before(function (done) {
      done = pedding(2, done);
      var pkg = utils.getPackage('dist_tag_test_module_destroy', '1.0.1', utils.admin);
      request(app.listen())
      .put('/' + pkg.name)
      .set('authorization', utils.adminAuth)
      .send(pkg)
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .put('/-/package/' + pkg.name + '/dist-tags/next')
        .set('authorization', utils.adminAuth)
        .set('content-type', 'application/json')
        .send(JSON.stringify('1.0.1'))
        .expect(201, done);
      });

      var pkg2 = utils.getPackage('@cnpmtest/dist_tag_test_module_destroy', '1.0.1', utils.admin);
      request(app.listen())
      .put('/' + pkg2.name)
      .set('authorization', utils.adminAuth)
      .send(pkg2)
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .put('/-/package/' + pkg2.name + '/dist-tags/next')
        .set('authorization', utils.adminAuth)
        .set('content-type', 'application/json')
        .send(JSON.stringify('1.0.1'))
        .expect(201, done);
      });
    });

    it('should destroy exists tag', function (done) {
      request(app.listen())
      .delete('/-/package/dist_tag_test_module_destroy/dist-tags/next')
      .set('authorization', utils.adminAuth)
      .set('content-type', 'application/json')
      .expect({
        ok: 'dist-tags updated'
      })
      .expect(200, function (err) {
        should.not.exist(err);
        request(app.listen())
        .get('/-/package/dist_tag_test_module_destroy/dist-tags')
        .expect(200)
        .expect({
          latest: '1.0.1',
        }, done);
      });
    });

    it('should destroy exists scoped tag', function (done) {
      request(app.listen())
      .delete('/-/package/@cnpmtest/dist_tag_test_module_destroy/dist-tags/next')
      .set('authorization', utils.adminAuth)
      .set('content-type', 'application/json')
      .expect({
        ok: 'dist-tags updated'
      })
      .expect(200, function (err) {
        should.not.exist(err);
        request(app.listen())
        .get('/-/package/@cnpmtest/dist_tag_test_module_destroy/dist-tags')
        .expect(200)
        .expect({
          latest: '1.0.1',
        }, done);
      });
    });

    it('should 404 destroy not exists tag', function (done) {
      request(app.listen())
      .delete('/-/package/dist_tag_test_module_destroy/dist-tags/not-exists')
      .set('authorization', utils.adminAuth)
      .set('content-type', 'application/json')
      .expect({
        ok: 'dist-tags updated'
      })
      .expect(200, done);
    });
  });

  describe('save()', function () {
    before(function (done) {
      done = pedding(2, done);
      var pkg = utils.getPackage('dist_tag_test_module_save', '1.0.1', utils.admin);
      request(app.listen())
      .put('/' + pkg.name)
      .set('authorization', utils.adminAuth)
      .send(pkg)
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .put('/-/package/' + pkg.name + '/dist-tags/next')
        .set('authorization', utils.adminAuth)
        .set('content-type', 'application/json')
        .send(JSON.stringify('1.0.1'))
        .expect(201, done);
      });

      var pkg2 = utils.getPackage('@cnpmtest/dist_tag_test_module_save', '1.0.1', utils.admin);
      request(app.listen())
      .put('/' + pkg2.name)
      .set('authorization', utils.adminAuth)
      .send(pkg2)
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .put('/-/package/' + pkg2.name + '/dist-tags/next')
        .set('authorization', utils.adminAuth)
        .set('content-type', 'application/json')
        .send(JSON.stringify('1.0.1'))
        .expect(201, done);
      });
    });

    it('should overwrite exists tags', function (done) {
      request(app.listen())
      .put('/-/package/dist_tag_test_module_save/dist-tags')
      .set('authorization', utils.adminAuth)
      .send({
        latest: '1.0.1',
        new: '1.0.1'
      })
      .expect({
        ok: 'dist-tags updated'
      })
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .get('/-/package/dist_tag_test_module_save/dist-tags')
        .expect(200)
        .expect({
          latest: '1.0.1',
          new: '1.0.1',
        }, done);
      });
    });

    it('should overwrite exists scoped tags', function (done) {
      request(app.listen())
      .put('/-/package/@cnpmtest/dist_tag_test_module_save/dist-tags')
      .set('authorization', utils.adminAuth)
      .send({
        latest: '1.0.1',
        new: '1.0.1'
      })
      .expect({
        ok: 'dist-tags updated'
      })
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .get('/-/package/@cnpmtest/dist_tag_test_module_save/dist-tags')
        .expect(200)
        .expect({
          latest: '1.0.1',
          new: '1.0.1',
        }, done);
      });
    });
  });

  describe('update()', function () {
    before(function (done) {
      done = pedding(2, done);
      var pkg = utils.getPackage('dist_tag_test_module_update', '1.0.1', utils.admin);
      request(app.listen())
      .put('/' + pkg.name)
      .set('authorization', utils.adminAuth)
      .send(pkg)
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .put('/-/package/' + pkg.name + '/dist-tags/next')
        .set('authorization', utils.adminAuth)
        .set('content-type', 'application/json')
        .send(JSON.stringify('1.0.1'))
        .expect(201, done);
      });

      var pkg2 = utils.getPackage('@cnpmtest/dist_tag_test_module_update', '1.0.1', utils.admin);
      request(app.listen())
      .put('/' + pkg2.name)
      .set('authorization', utils.adminAuth)
      .send(pkg2)
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .put('/-/package/' + pkg2.name + '/dist-tags/next')
        .set('authorization', utils.adminAuth)
        .set('content-type', 'application/json')
        .send(JSON.stringify('1.0.1'))
        .expect(201, done);
      });
    });

    it('should merge exists tags', function (done) {
      request(app.listen())
      .post('/-/package/dist_tag_test_module_update/dist-tags')
      .set('authorization', utils.adminAuth)
      .send({
        latest: '1.0.1',
        new: '1.0.1'
      })
      .expect({
        ok: 'dist-tags updated'
      })
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .get('/-/package/dist_tag_test_module_update/dist-tags')
        .expect(200)
        .expect({
          latest: '1.0.1',
          next: '1.0.1',
          new: '1.0.1',
        }, done);
      });
    });

    it('should merge exists scoped tags', function (done) {
      request(app.listen())
      .post('/-/package/@cnpmtest/dist_tag_test_module_update/dist-tags')
      .set('authorization', utils.adminAuth)
      .send({
        latest: '1.0.1',
        new: '1.0.1'
      })
      .expect({
        ok: 'dist-tags updated'
      })
      .expect(201, function (err) {
        should.not.exist(err);
        request(app.listen())
        .get('/-/package/@cnpmtest/dist_tag_test_module_update/dist-tags')
        .expect(200)
        .expect({
          latest: '1.0.1',
          next: '1.0.1',
          new: '1.0.1',
        }, done);
      });
    });
  });
});
