module.exports = {
    default: {
      require: ["test/resources/features/**/*.ts"], // Carrega os arquivos de step definitions em TypeScript
      requireModule: ["ts-node/register"], // Permite rodar TypeScript
      paths: ["test/resources/features/**/*.feature"], // Localização dos arquivos .feature
    },
  };