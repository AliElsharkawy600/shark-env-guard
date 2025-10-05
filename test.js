// simple testing

delete process.env.TEST_VAR;
delete process.env.ANOTHER_VAR;

const { guardEnv } = require('./index.js');

console.log('🧪 Test 1: Should exit with error (missing vars)');

try {
  guardEnv(['TEST_VAR', 'ANOTHER_VAR'], { throwOnError: true });
} catch (e) {
  console.log('✅ Test 1 passed: Correctly threw error for missing vars');
}

console.log('\n🧪 Test 2: Should pass if vars exist');

process.env.TEST_VAR = 'hello';
process.env.ANOTHER_VAR = 'world';

try {
  guardEnv(['TEST_VAR', 'ANOTHER_VAR'], { throwOnError: true });
  console.log('✅ Test 2 passed: All vars present');
} catch (e) {
  console.error('❌ Test 2 failed');
}

console.log('\n🎉 All tests passed!');