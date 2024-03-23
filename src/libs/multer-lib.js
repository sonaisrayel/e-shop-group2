import Multer from 'multer';

const storage = Multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
});

export const upload = Multer({storage});