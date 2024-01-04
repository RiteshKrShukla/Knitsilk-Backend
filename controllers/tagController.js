const Tag = require('../models/tagsModel');

const tagController = {
    getAllTags: async (req, res) => {
        try {
            const tags = await Tag.find();
            res.json(tags);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createTag: async (req, res) => {
        try {
            const { tags } = req.body;
            const newTag = new Tag({ tags });
            const savedTag = await newTag.save();
            res.json(savedTag);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateTag: async (req, res) => {
        const { id } = req.params;
        const { tags } = req.body;

        try {
            const updatedTag = await Tag.findByIdAndUpdate(
                id,
                { tags },
                { new: true }
            );

            if (!updatedTag) {
                return res.status(404).json({ error: 'Tag not found' });
            }

            res.json(updatedTag);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteTag: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedTag = await Tag.findByIdAndDelete(id);

            if (!deletedTag) {
                return res.status(404).json({ error: 'Tag not found' });
            }

            res.json({ message: 'Tag deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = tagController;
