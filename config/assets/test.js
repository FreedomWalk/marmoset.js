'use strict';

module.exports = {
    tests: {
        client: ['modules/*/tests/client/**/*.js'],
        server: ['modules/*/tests/server/**/*.js'],
        // server: ['modules/schedules/tests/server/common/ScheduleHelper.test.js'],
        e2e: ['modules/*/tests/e2e/**/*.js']
    }
};
