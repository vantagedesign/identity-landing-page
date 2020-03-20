/* -------------------------------------------------------------------------
*	IDENTITY LANDING PAGE | @version 1.0.0 | @author Vantage Design | @license https://github.com/vantagedesign/identity-landing-page/blob/master/LICENSE.md
*	Gulpfile.
* ------------------------------------------------------------------------ */

/* Define requirements */
/* Core */
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var browsersync = require('browser-sync');

/* css */
var cleancss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var scss = require('gulp-sass');

/* js */
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

/* files */
var del = require('del');



/* Define source and destination paths for file types */
var dist = 'dist/';
var paths = {
	html: {
		src: 'src/**/*.html',
		dest: dist
	},
	scss: {
		src: 'src/css/**/*.scss',
		dest: dist + 'css/'
	},
	css: {
		src: 'src/css/**/*.css',
		dest: dist + 'css/'
	},
	js: {
		src: 'src/js/**/*.js',
		dest: dist + 'js/'
	},
	plugins: {
		js: {
			src: [
				'src/plugins/**/*.js'
			],
			dest: dist + 'js/'
		}
	},
	copy: {
		src: [
			'src/**/*.*',
			'!src/{css,js}/**/*.*',
			'!src/**/*.{psd}'
		],
		dest: dist
	},
}

var autoprefix_setting = [
	'last 2 version',
	'> 1%',
	'ie 8',
	'ie 9',
	'ios 6',
	'android 4'
]



/** --------------------------------------------
* CSS processing
--------------------------------------------- */
/* Process CSS */
function css_process(){
	return gulp.src(paths.css.src)
	.pipe(plumber())
	.pipe(autoprefixer(autoprefix_setting))
	.pipe(gulp.dest(paths.css.dest))
	.pipe(cleancss({keepBreaks: false}))
	.pipe(rename({ extname: '.min.css' }))
	.pipe(gulp.dest(paths.css.dest))
	.pipe(notify({message: 'CSS processed'})
	);
}
/* Process SCSS */
function scss_process(){
	return gulp.src(paths.scss.src)
	.pipe(plumber())
	.pipe(scss().on('error', scss.logError))
	.pipe(autoprefixer(autoprefix_setting))
	.pipe(gulp.dest(paths.css.dest))
	.pipe(cleancss({keepBreaks: false}))	
	.pipe(rename({ extname: '.min.css' }))
	.pipe(gulp.dest(paths.scss.dest))
	.pipe(notify({message: 'SCSS processed'})
	);
}



/** --------------------------------------------
* Javascript processing
--------------------------------------------- */
/* Process ES5 Javascript */
function js_process(){
	return gulp.src(paths.js.src)
	.pipe(plumber())
	.pipe(concat('main.js'))
	.pipe(gulp.dest(paths.js.dest))
	.pipe(uglify())
	.pipe(rename({ extname: '.min.js' }))
	.pipe(gulp.dest(paths.js.dest))
	.pipe(notify({message: 'Javascript processed'})
	);
}
/* Process ES5 Javascript */
function js_plugins_process(){
	return gulp.src(paths.plugins.js.src)
	.pipe(plumber())
	.pipe(concat('plugins.js'))
	.pipe(gulp.dest(paths.plugins.js.dest))
	.pipe(rename({ extname: '.min.js' }))
	.pipe(uglify())
	.pipe(gulp.dest(paths.plugins.js.dest))
	.pipe(notify({message: 'Javascript plugins processed'})
	);
}



/*---------------------------------------------
* 	Copy other files
*---------------------------------------------*/
/* Copy other src files to their dest */
function html_process() {
	return gulp.src(paths.html.src, {base: 'src/'})
	.pipe(gulp.dest(paths.html.dest))
}

function copy_files() {
	return gulp.src(paths.copy.src, {base: 'src/'})
	.pipe(gulp.dest(paths.copy.dest))
}


/** --------------------------------------------
* Launch browsersync server
--------------------------------------------- */
gulp.task('browsersync', function(cb){
	browsersync.init(['**/*.css', '**/*.js', '**/*.html', '**/*.php,'], {
		server: {
			baseDir: dist
		}
	}, cb);
	console.log('Browsersync server started');
});



/*---------------------------------------------
* 	Cleanup
*---------------------------------------------*/
/* Clean all dest files */
function clean_dist() {
	return del(dist);
}



/*---------------------------------------------
* 	Gulp functions & tasks
*---------------------------------------------*/
/* Define files to watch */
function watch(cb) {
	gulp.watch(paths.html.src, html_process);
	gulp.watch(paths.css.src, css_process);
	gulp.watch(paths.scss.src, scss_process);
	gulp.watch(paths.js.src, js_process);
	gulp.watch(paths.plugins.js.src, js_plugins_process);
	gulp.watch(paths.copy.src, copy_files);
	cb();
}

/* Internal tasks */
var init =	gulp.series(
		clean_dist,
		css_process,
		scss_process,
		js_process,
		js_plugins_process,
		html_process,
		copy_files
	);



/* Exposed tasks */
gulp.task('dev',
	gulp.series(
		init,
		gulp.parallel(
			watch,
			'browsersync'
		)
	)
);

/* Exposed tasks */
gulp.task('build',
	gulp.series(
		init
	)
);

gulp.task('clean', clean_dist);
