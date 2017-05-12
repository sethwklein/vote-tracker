// Node 6.10.3 doesn't seem to support import. Sorry Airbnb.
const autoprefixer = require('gulp-autoprefixer');
const gulp = require('gulp');
const maps = require('gulp-sourcemaps');
const named = require('vinyl-named');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const semver = require('semver');

if (!semver.satisfies(process.version, ">=6")) {
  console.error("Error: please use Node 6+");
  process.exit(1);
}

const build = './build'; // can't refer to it before it's defined

const config = {
  browsers: ['> 3%'],

  sass: './scss/**/*.scss',
  jsx: './jsx/**/*.jsx',
  html: './html/**/*.html',
  img: './img/**/*',

  build: build,
  css: build,
  js: build,
  // HTML output goes in the build directory. If not using a single build
  // directory, it might not be built at all.
  // Images go in the build directory. If not using a single build directory,
  // they might not be built at all.
};

gulp.task('sass', function() {
  return gulp.src(config.sass)
    .pipe(sass({
      style: 'expanded',
      precision: 6,
      sourcemap: true,
    }).on('error', sass.logError))
    .pipe(maps.init())
    .pipe(autoprefixer({
      browsers: config.browsers,
      cascade: false,
    }))
    .pipe(maps.write('./')) // puts them in the directory with the CSS
    .pipe(gulp.dest(config.css));
});

gulp.task('jsx', function() {
  return gulp.src(config.jsx)
    .pipe(named())
    .pipe(webpack({
      module: {
        loaders: [{
          loader: "babel",
          test: /\.jsx$/,
          exclude: /node_modules/,
          query: {
            'presets': [
              ['env', {
                'targets': {
                  'browsers': config.browsers,
                }
              }],
            ],
            // The React preset brings in Flow, and I'd rather not. --sk
            'plugins': [
              'syntax-jsx',
              'transform-react-jsx',
              'transform-react-display-name',
            ],
          },
        }],
      },
    }))
    .pipe(gulp.dest(config.js));
});

gulp.task('html', function() {
  return gulp.src(config.html)
    .pipe(gulp.dest(config.build));
});

gulp.task('img', function() {
  return gulp.src(config.img)
    .pipe(gulp.dest(config.build));
});

gulp.task('all', ['sass', 'jsx', 'html', 'img']);

gulp.task('watch', ['all'], function() {
  gulp.watch(config.sass, ['sass']);
  gulp.watch(config.jsx, ['jsx']);
  gulp.watch(config.html, ['html']);
  gulp.watch(config.img, ['img']);
});

gulp.task('default', ['all']);
