import gulp from "gulp";

import clean from "gulp-clean";
import cleanCSS from "gulp-clean-css";
import  minifyJS from "gulp-js-minify";
import imgMin from "gulp-imagemin";

import dartSass from "sass";
import gulpSass from "gulp-sass";

import autoprefixer from "gulp-autoprefixer";

import concat from "gulp-concat";

import rename from "gulp-rename";

import browserSync from "browser-sync";
const bsServer = browserSync.create();

const {parallel, series, src, dest, watch} = gulp;

const sass = gulpSass(dartSass);

function server() {
    bsServer.init({
        server: {
            baseDir: "./"
        }
    })
}

function cleanDist() {
    return src("./dist/*")
        .pipe(clean());
}

function styles() {
    return src("./src/scss/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(autoprefixer(["last 15 versions",">1%","ie 8", "ie 7"], {
            cascade: true,
        }))
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest("./dist/css/"))
        .pipe(bsServer.reload({ stream: true }));
}

function scripts() {
    return src("./src/js/**/*.js")
        .pipe(concat('scripts.min.js', {newLine: ';'}))
        .pipe(minifyJS())
        .pipe(dest("./dist/js/"))
        .pipe(bsServer.reload({ stream: true }));
}

function images() {
    return src("./src/img/**/*.{jpg, jpeg,png,svg,webp}")
        .pipe(imgMin())
        .pipe(dest("./dist/img/"))
        .pipe(bsServer.reload({ stream: true }));
}

function watcher() {
    watch("./src/img/**/*.{jpg,jpeg,png,svg,webp}", images);
    watch("./src/scss/**/*.scss", styles);
    watch("./src/js/**/*.js", scripts);
    watch("./index.html").on("change", bsServer.reload);
}

export const build = series(cleanDist, images, styles, scripts);

export const dev = series(build, parallel(server, watcher));
export default dev;