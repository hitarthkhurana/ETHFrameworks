const fs = require('fs');
const axios = require('axios');
const path = require('path');
const OpenAI = require("openai");
const dotenv = require('dotenv');

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
    let imageUrl;
    try {
        imageUrl = await generateImageURL(prompt);
        if (imageUrl) {
            // await saveImageFromURL(imageUrl, folderPath);
            console.log("Generated image URL:", imageUrl);
        } else {
            console.log("Failed to generate image.");
        }
    } catch (error) {
        console.error("Error processing image generation:", error);
    }
    return imageUrl; // Return imageUrl only if it's defined
}


export function generatePrompt(categories) {
    const [skip, activity, planet, pet, profession] = categories;
    return `Generate an image of a ${profession} who has a pet ${pet}, and they live on ${planet}. They chose the ${activity}. MAKE A HD image of this scene`;
}

// Example input categories
const categories = ['doctor', 'rat', 'LA', 'Swimming', 'hot female'];

const prompt = generatePrompt(categories);
processImageGeneration(prompt, folderPath);