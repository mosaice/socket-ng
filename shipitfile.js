module.exports = shipit => {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);
  shipit.initConfig({
    default: {
      servers: {
        host: 'mosaice',
        user: 'deploy'
      },
      ignores: ['assets'],
      shallowClone: true,
      deleteOnRollback: true,
      deployTo: '/data/www/music.mosaice.cn',
      repositoryUrl: 'git@gitee.com:mosaice/empty.git',
      keepReleases: 5,
      shared: {
        overwrite: true,
        dirs: ['assets']
      }
    },
    production: {
      servers: {
        host: 'mosaice',
        user: 'deploy'
      }
    }
  });

  shipit.on('deployed', async () => {
    await shipit.local('npm run build');
    await shipit.copyToRemote(
      'dist/client/assets/*',
      '/data/www/test.mosaice.com/shared/assets/'
    );

    await shipit.copyToRemote('dist/client/', shipit.currentPath);
  });
};
