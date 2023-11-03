const express = require('express');

const router = express.Router();

const productcontroller = require('../controller/product');

router.post('/', productcontroller.postproducts);

router.get('/', productcontroller.getproducts);

router.get('/:productId', productcontroller.detailproduct);

router.put('/:productId', productcontroller.changeproduct);

router.delete('/:productId', productcontroller.deleteproduct);

module.exports = router;
