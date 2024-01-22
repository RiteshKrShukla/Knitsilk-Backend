const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const schedule = require('node-schedule');


// Schedule the auto-inactivation route to run every day at midnight
schedule.scheduleJob('0 0 * * *', async () => {
  try {
    const now = new Date();
    const expiredCoupons = await Coupon.find({
      status: 'Active',
      validTo: { $lt: now },
    });

    if (expiredCoupons.length > 0) {
      const inactivatePromises = expiredCoupons.map(async (coupon) => {
        coupon.status = 'Inactive';
        return coupon.save();
      });

      await Promise.all(inactivatePromises);
      console.log('Coupons inactivated successfully');
    } else {
      console.log('No coupons to inactivate');
    }
  } catch (error) {
    console.error('Error auto-inactivating coupons:', error.message);
  }
});

// Create a new coupon
router.post('/coupons', async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).send(coupon);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all coupons
router.get('/coupons', async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.send(coupons);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single coupon by ID
router.get('/coupons/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).send({ error: 'Coupon not found' });
    }
    res.send(coupon);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a coupon by ID
router.patch('/coupons/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['code', 'percentageDiscount', 'validFrom', 'validTo'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!coupon) {
      return res.status(404).send({ error: 'Coupon not found' });
    }

    res.send(coupon);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Change the status of a coupon by ID
router.patch('/coupons/:id/change-status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    return res.status(200).json(updatedCoupon);
  } catch (error) {
    console.error('Error changing coupon status:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a coupon by ID
router.delete('/coupons/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return res.status(404).send({ error: 'Coupon not found' });
    }

    res.send(coupon);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
