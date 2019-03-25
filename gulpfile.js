/* eslint no-unused-vars: 0, max-len: 0, no-trailing-spaces: 0  */
'use strict';
// Require Gulp first
const gulp = require('gulp');
//  packageJson = require('./package.json'),
// Load plugins
// const $ = require('gulp-load-plugins')({lazy: true});

// Markdown and templates
const markdown = require('gulp-remarkable');
const wrap = require('gulp-wrap');
const newer = require('gulp-newer');

// CSS stuff
const sass = require('node-sass');
// postcss
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// JS Stuff
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
// Imagemin and Plugins
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const webp = require('imagemin-webp');

// Static Web Server stuff
const browserSync = require('browser-sync');
// const reload = browserSync.reload;
const historyApiFallback = require('connect-history-api-fallback');


/**
 * @name markdown
 * @description converts markdown to HTML
 */
gulp.task('markdown', () => {
  return gulp.src('src/pages/*.md')
      .pipe(newer('src/converted-md/'))
      .pipe(markdown({
        preset: 'commonmark',
        typographer: true,
        remarkableOptions: {
          typographer: true,
          linkify: true,
          breaks: false,
        },
      }))
      .pipe(gulp.dest('src/converted-md/'));
});

gulp.task('build-template', ['markdown'], () => {
  gulp.src('./src/converted-md/*.html')
      .pipe($.wrap({
        src: './src/templates/template.html',
      }))
      .pipe(gulp.dest('./src/'));
});


// SCSS conversion and CSS processing
/**
 * @name sass:dev
 * @description SASS conversion task to produce development css with expanded syntax.
 *
 * We run this task agains Ruby SASS, not lib SASS. As such it requires the SASS Gem to be installed
 *
 * @see {@link http://sass-lang.com|SASS}
 * @see {@link http://sass-compatibility.github.io/|SASS Feature Compatibility}
 */
gulp.task('sass:dev', () => {
  return sass('src/sass/**/*.scss', {
    sourcemap: true,
    style: 'expanded',
  })
      .pipe(gulp.dest('src/css'))
      .pipe($.size({
        pretty: true,
        title: 'SASS',
      }));
});

/**
 * @name processCSS
 *
 * @description Run autoprefixer and cleanCSS on the CSS files under src/css
 *
 * Moved from gulp-autoprefixer to postcss. It may open other options in the future
 * like cssnano to compress the files
 *
 * @see {@link https://github.com/postcss/autoprefixer|autoprefixer}
 */
gulp.task('processCSS', () => {
  // What processors/plugins to use with PostCSS
  const PROCESSORS = [
    autoprefixer({
      browsers: ['last 3 versions'],
    }),
  ];
  return gulp
      .src('src/css/**/*.css')
      .pipe($.sourcemaps.init())
      .pipe(postcss(PROCESSORS))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('src/css'))
      .pipe($.size({
        pretty: true,
        title: 'processCSS',
      }));
});


/**
 * @name babel
 * @description Transpiles ES6 to ES5 using Babel. As Node and browsers support more of the spec natively this will move to supporting ES2016 and later transpilation
 *
 * It requires the `@babel/core`, and `@babel/preset-env`
 *
 * @see {@link http://babeljs.io/|Babel}
 * @see {@link http://babeljs.io/docs/learn-es2015/|Learn ES2015}
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/|ECMAScript 2015 specification}
 */
gulp.task('babel', () => {
  return gulp.src('src/es6/**/*.js')
      .pipe($.sourcemaps.init())
      .pipe($.babel({
        presets: ['@babel/preset-env'],
      }))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('src/js/'));
});

/**
 * @name eslint
 * @description Runs eslint on all javascript files
 */
gulp.task('eslint', () => {
  return gulp.src([
    'scr/scripts/**/*.js',
  ])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});


/**
 * @name imagemin
 * @description Reduces image file sizes. Doubly important if we'll choose to play with responsive images.
 *
 * Imagemin will compress jpg (using mozilla's mozjpeg), SVG (using SVGO) GIF and PNG images but WILL NOT create multiple versions for use with responsive images
 *
 * @see {@link https://github.com/postcss/autoprefixer|Autoprefixer}
 * @see {@link processImages}
 */
gulp.task('imagemin', () => {
  return gulp.src('src/images/**')
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false,
        },
        {
          cleanupIDs: false,
        },
        ],
        use: [mozjpeg()],
      }))
      .pipe(gulp.dest('src/images'));
});

/**
 * @name processImages
 * @description processImages creates a set of responsive images for each of the PNG and JPG images in the images
 * directory
 *
 * @see {@link http://sharp.dimens.io/en/stable/install/|Sharp}
 * @see {@link https://github.com/jcupitt/libvips|LibVIPS dependency for Mac}
 * @see {@link https://www.npmjs.com/package/gulp-responsive|gulp-responsive}
 * @see {@link imagemin}
 *
 */
gulp.task('processImages', () => {
  return gulp.src(['src/images/**/*.{jpg,png}', '!src/images/touch/*.png'])
      .pipe($.responsive({
        '*': [{
          // image-small.jpg is 200 pixels wide
          width: 200,
          rename: {
            suffix: '-small',
            extname: '.jpg',
          },
        }, {
          // image-small@2x.jpg is 400 pixels wide
          width: 200 * 2,
          rename: {
            suffix: '-small@2x',
            extname: '.jpg',
          },
        }, {
          // image-large.jpg is 480 pixels wide
          width: 480,
          rename: {
            suffix: '-large',
            extname: '.jpg',
          },
        }, {
          // image-large@2x.jpg is 960 pixels wide
          width: 480 * 2,
          rename: {
            suffix: '-large@2x',
            extname: '.jpg',
          },
        }, {
          // image-extralarge.jpg is 1280 pixels wide
          width: 1280,
          rename: {
            suffix: '-extralarge',
            extname: '.jpg',
          },
        }, {
          // image-extralarge@2x.jpg is 2560 pixels wide
          width: 1280 * 2,
          rename: {
            suffix: '-extralarge@2x',
            extname: '.jpg',
          },
        }, {
          // image-small.webp is 200 pixels wide
          width: 200,
          rename: {
            suffix: '-small',
            extname: '.webp',
          },
        }, {
          // image-small@2x.webp is 400 pixels wide
          width: 200 * 2,
          rename: {
            suffix: '-small@2x',
            extname: '.webp',
          },
        }, {
          // image-large.webp is 480 pixels wide
          width: 480,
          rename: {
            suffix: '-large',
            extname: '.webp',
          },
        }, {
          // image-large@2x.webp is 960 pixels wide
          width: 480 * 2,
          rename: {
            suffix: '-large@2x',
            extname: '.webp',
          },
        }, {
          // image-extralarge.webp is 1280 pixels wide
          width: 1280,
          rename: {
            suffix: '-extralarge',
            extname: '.webp',
          },
        }, {
          // image-extralarge@2x.webp is 2560 pixels wide
          width: 1280 * 2,
          rename: {
            suffix: '-extralarge@2x',
            extname: '.webp',
          },
        }, {
          // Global configuration for all images
          // The output quality for JPEG, WebP and TIFF output formats
          quality: 80,
          // Use progressive (interlace) scan for JPEG and PNG output
          progressive: true,
          // Skip enalrgement warnings
          skipOnEnlargement: false,
          // Strip all metadata
          withMetadata: true,
        }],
      })
          .pipe(gulp.dest('dist/images')));
});


/**
 * @name clean
 * @description deletes specified files
 */
gulp.task('clean', () => {
  return del.sync([
    'dist/',
    '.tmp',
    'src/html-content',
    'src/*.html',
    'src/pm-content',
    'src/pdf',
  ]);
});

gulp.task('serve', () => {
  browserSync({
    port: 2509,
    notify: false,
    logPrefix: 'ATHENA',
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: (snippet) => {
          return snippet;
        },
      },
    },
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['.tmp', 'docs'],
      middleware: [historyApiFallback()],
    },
  });
});

/**
 * @name default
 * @description uses clean, processCSS, build-template, imagemin and copyAssets to build the HTML content from Markdown source
 */
gulp.task('default', () => {
  runSequence('processCSS', 'build-template', 'imagemin', 'copyAssets');
});
