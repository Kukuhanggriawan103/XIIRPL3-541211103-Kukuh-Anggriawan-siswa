const User = require('../../models/users');

module.exports = {
  //get all user
  index: async (req, res) => {
    try {
      const users = await User.find();
      if (users.length > 0) {
        res.status(200).json({
          status: true,
          data: users,
          method: req.method,
          url: req.url
        });
      } else {
        res.status(404).json({ success: false, message: 'Tidak ada data pengguna' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan' });
    }
  },
  //get a user
  show: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      res.json({
        status: true,
        data: user,
        method: req.method,  
        url: req.url,
        message: "Data berhasil di dapat"
      })
    } catch (error) {
      res.status(400).json({success : false})
      
    }
  
  },
  store: async (req, res) => {
    try {
        const users = await User.create(req.body)
        res.json({
            status: true,
            data: users,
            method: req.method,
            url: req.url,
            message: "Data Berhasil Ditambahkan"
        });
    } catch (error) {
        res.status(400).json({ success: false }) 
    }
  },
  update: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      res.json({
        status: true,
        data: user,
        method: req.method,
        url: req.url,
        message: "Data berhasil diubah"
      })
    } catch (error) {
      res.status(400).json({success: false})
    }
  
  },
  delete: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.json({
        status: true,
        method: req.method,
        url: req.url,
        message: "Data berhasil dihapus"
      })
    } catch (error) {
      res.status(400).json({success: false})
    }
  },
};
