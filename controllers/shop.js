const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  });
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  });
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findById(prodId);
  res.render('shop/product-detail', {
    product: product[0],
    pageTitle: product[0].title,
    path: '/products'
  });
};


exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    console.log("cart==>", cart);
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      // console.log("cartProducts==>", cartProducts);
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts,
        total: cart.totalPrice
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
