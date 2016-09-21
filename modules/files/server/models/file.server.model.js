'use strict';

const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const logger = require(path.resolve('./config/lib/logger'));

// const Suffix = ['jpg', 'png', 'jpeg', 'gif', 'bmp', 'zip', 'rar', 'wav',
//     'mp3', 'amr', 'txt', 'html', 'pdf', 'doc', 'dot', 'docx', 'pot', 'pps',
//     'ppt', 'pptx', 'xla', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'xlsx', 'mp4',
//     'mpg', 'mps', 'wmv', 'rmvb', 'avi'
// ];
// const FileType = ['txt', 'pic', 'video', 'other'];

let FileSchema = new Schema({
    originName: {
        type: String,
        trim: true,
        required: 'Please insert originName'
    },
    //后缀
    suffix: {
        type: String,
        trim: true,
        required: 'file must have suffix'
    },
    fileSize: {
        type: Number
    },
    summary: [String],
    gridFSId: {
        type: String
    },
    remark: {
        type: String
    },
    md5: {
        type: String
    }
});

let fileType = FileSchema.virtual('fileType');
fileType.get(function () {
    switch (this.suffix.toLowerCase()) {
        // ['jpg', 'png', 'jpeg', 'gif', 'bmp', 'zip', 'rar', 'wav',
        //   'mp3', 'amr', 'txt', 'html', 'pdf', 'doc', 'dot', 'docx', 'pot', 'pps',
        //   'ppt', 'pptx', 'xla', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'xlsx', 'mp4',
        //   'mpg', 'mps', 'wmv', 'rmvb', 'avi'
        // ]
        case 'jpg':
        case 'png':
        case 'jpeg':
        case 'gif':
        case 'bmp':
            return 'pic';
        case 'txt':
        case 'html':
        case 'pdf':
        case 'doc':
        case 'dot':
        case 'docx':
            return 'txt';
        case 'mp4':
        case 'mpg':
        case 'mps':
        case 'wmv':
        case 'rmvb':
        case 'avi':
        case 'flv':
            return 'video';
        default:
            return 'other';
    }
});

let fullName = FileSchema.virtual('fullName');
fullName.get(function () {
    if (this.suffix) {
        return this.originName + '.' + this.suffix;
    } else {
        return this.originName;
    }
});

mongoose.model('FileInfo', FileSchema);
