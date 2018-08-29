const express = require('express');
const router = express.Router();

router.all('*', async (req, res, next) => {
  try {
    res.statusCode = 404;
    throw new Error('صفحه مورد نظر یافت نشد');
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = error.message || '';
  const stack = error.stack || '';
  const layouts = {
    layout: 'home/master'
  }

  res.render(`errors/${statusCode}`, {
    ...layouts,
    title: message
  });
});


module.exports = router;