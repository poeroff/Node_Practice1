const express = require('express');
const product = require('../schemas/products.schema');
const mongoose = require('mongoose');

exports.postproducts = async (req, res, next) => {
    const { title, content, author, password } = req.body;

    if (!title || !content || !author || !password) {
        return res
            .status(400)
            .json({ error: '데이터 형식이 올바르지 않습니다' });
    }
    

    const createdAt = new Date();
 
    const status = 'FOR_SALE';

    await product.create({
        title,
        content,
        author,
        password,
        status,
        createdAt,
    });
    res.json({ message: '판매 상품을 등록하였습니다.' });
};

exports.getproducts = async (req, res, next) => {
    const result = await product.find({});
    res.json({ data: result });
};

exports.detailproduct = async (req, res, next) => {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res
            .status(400)
            .json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    const search = await product.find({ _id: productId });

    if (!search) {
        return res.status(400).json({ message: '상품 조회에 실패하였습니다.' });
    }

    const result = search.map((data) => {
        return {
            _id: data._id,
            title: data.title,
            content: data.content,
            author: data.author,
            status: data.status,
            createdAt: data.createdAt,
        };
    });
    res.json({ data: result });
};

exports.changeproduct = async (req, res, next) => {
    const { productId } = req.params;
    const { title, content, password, status } = req.body;
    const change = await product.find({ _id: productId });

    if (!change) {
        return res.status(400).json({ message: '상품 조회에 실패하였습니다.' });
    } else if (
        !title ||
        !content ||
        !password ||
        !status ||
        !mongoose.Types.ObjectId.isValid(productId)
    ) {
        return res
            .status(404)
            .json({ message: '데이터 형식이 올바르지 않습니다.' });
    } else {
        if (change[0].password === password) {
            await product.updateOne({
                _id: productId,
                $set: { title: title, content: content, status: status },
            });
            res.json({ message: '상품 정보를 수정하였습니다.' });
        } else {
            res.status(401).json({
                message: '상품을 수정할 권한이 존재하지 않습니다.',
            });
        }
    }
};

exports.deleteproduct = async (req, res, next) => {
    const { productId } = req.params;
    const { password } = req.body;
    const change = await product.find({ _id: productId });
    if (!change) {
        return res.status(400).json({ message: '상품 조회에 실패하였습니다.' });
    } else if (!password || !mongoose.Types.ObjectId.isValid(productId)) {
        return res
            .status(404)
            .json({ message: '데이터 형식이 올바르지 않습니다.' });
    } else {
        if (change[0].password === password) {
            await product.deleteOne({ _id: productId });
            res.json({ message: '상품을 삭제하였습니다' });
        } else {
            res.status(401).json({
                message: '상품을 삭제할 권한이 존재하지 않습니다.',
            });
        }
    }
};
