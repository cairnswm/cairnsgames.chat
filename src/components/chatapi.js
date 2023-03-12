export const getChat = (apikey, chatMessages) => {
    const OPENAI_API_KEY = apikey || "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"; // replace with your actual API key
  
    const requestData = {
      model: "gpt-3.5-turbo",
      messages: chatMessages.map((c) => {return { role: c.role, content: c.content}})
    };
  
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //               role: "assistant",
    //               content:
    //                 "\n\nSalsa is a popular partner dance that originated in Cuba in the 1920s and later spread throughout Latin America and the rest of the world. It is a lively and energetic dance that requires precise footwork and fluid body movements. The music played during salsa dancing is typically a combination of different Latin rhythms, including Cuban son, mambo, and cha-cha-cha, among others. Salsa is known for its infectious rhythm, catchy beats, and the passion and joy that it brings to both dancers and spectators. If you want to know more about salsa, you can visit http://juzt.dance/salsa/.",
    //             })
    //   }, 1000);
    // });
  
    return fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Do something with the response data
        return data.choices[0].message;
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };