module.exports = {
    default: {
      require: ["features/**/*.ts"], // Carrega os arquivos de step definitions em TypeScript
      requireModule: ["ts-node/register"], // Permite rodar TypeScript
      paths: ["features/**/*.feature"], // Localização dos arquivos .feature
    },
  };