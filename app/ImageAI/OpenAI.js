const fs = require('fs');
const axios = require('axios');
const path = require('path');
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: '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',
});

const folderPath = path.join(__dirname, "assets"); 

export async function saveImageFromURL(imageUrl, folderPath) {
    try {
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer'
        });

        // Extracting image name from URL
        const imageName = 'img1.png'
        const imagePath = path.join(folderPath, imageName);

        fs.writeFileSync(imagePath, response.data);

        console.log("Image saved successfully at:", imagePath);
    } catch (error) {
        console.error("Error saving image:", error);
    }
}

async function generateImageURL(prompt) {
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        return response.data[0].url;
    } catch (error) {
        console.error("Error generating image:", error);
        return null; 
    }
}

export async function processImageGeneration(prompt, folderPath) {
    try {
        const imageUrl = await generateImageURL(prompt);
        if (imageUrl) {
            await saveImageFromURL(imageUrl, folderPath);
            console.log("Generated image URL:", imageUrl);
        } else {
            console.log("Failed to generate image.");
        }
    } catch (error) {
        console.error("Error processing image generation:", error);
    }
}

export function generatePrompt(categories) {
    const [profession, pet, planet, activity, gender] = categories;
    return `Generate an image of a ${gender} ${profession} who has a pet ${pet}, and they live on ${planet}. Their favorite thing to do is ${activity}.`;
}

// Example input categories
const categories = ['doctor', 'rat', 'LA', 'Swimming', 'hot female'];

const prompt = generatePrompt(categories);
processImageGeneration(prompt, folderPath);