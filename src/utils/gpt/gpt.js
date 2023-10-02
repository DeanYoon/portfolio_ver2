import axios from "axios";

const OPENAI_API_KEY = process.env.REACT_APP_CHATGPT_API_KEY;

export const musicRecommend = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant who recommend music with singer, song name. show one data of only 'singer - song name' without any explanation. maximum text is 50",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    if (response.status === 200) {
      const data = response.data;
      //   console.log(data);
      const result = data.choices[0].message.content;
      return result;
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};
