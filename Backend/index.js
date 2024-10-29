const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/configurations", (req, res) => {
  fs.readFile("./configurations.json", "utf8", (err, data) => {
    if (err) {
      console.error(
        "Error al leer el archivo de configuraciones:",
        err.message
      );
      return res.status(500).json({
        status: "error",
        message: "Hubo un error al cargar las configuraciones.",
      });
    }

    const configurations = JSON.parse(data);
    res.status(200).json({
      status: "success",
      data: configurations,
      message: "Configuraciones obtenidas exitosamente.",
    });
  });
});
  
  app.post("/generate-script", async (req, res) => {
    const { distribution, backend, database } = req.body;
  
    if (!distribution || !backend || !database) {
      return res.status(400).json({
        status: "error",
        message: "Faltan parámetros. Se requieren: distribution, backend y database.",
      });
    }
  
    const prompt = `Genera un script Bash para instalar ${backend} y ${database} en la distribución ${distribution} de Linux sin comentarios adicionales.`;
  
    if (prompt.length > 2000) {
      return res.status(400).json({
        status: "error",
        message: "El contenido del mensaje no puede exceder los 2000 caracteres.",
      });
    }
  
    try {
      const response = await axios.post(
        "https://getcody.ai/api/v1/messages",
        {
          content: prompt,
          conversation_id: "yMYerP4RkbOB"
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CODY_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const script = response.data.data.content || "No se recibió un script válido de la API.";
      if (script) {
        return res.status(200).json({
          status: "success",
          data: {
            script: script.trim(),
          },
          message: "Script generado exitosamente",
        });
      } else {
        throw new Error("No se recibió un script válido de la API.");
      }
    } catch (error) {
      console.error("Error al llamar a la API de Cody IA:", error.message);
      if (error.response) {
        console.error("Detalles de la respuesta de la API:", error.response.data);
      }
      return res.status(500).json({
        status: "error",
        message: "Hubo un error al generar el script. Intente nuevamente más tarde.",
      });
    }
  });
  
  

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
