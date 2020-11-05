module.exports = path => () => import('@/components/' + path + '.vue');
// module.exports = path => r => require.ensure([], () => r(require('@/views/' + path + '.vue')));
