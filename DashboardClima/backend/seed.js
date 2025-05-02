// import { faker } from '@faker-js/faker';
// import { criandoLocalETemperatura } from './src/Models/ClimaModels.js'; // Ajuste o caminho conforme necessário

// const gerarRegistros = async (quantidade) => {
//     const locaisGerados = new Set();
//     const registros = [];

//     while (locaisGerados.size < quantidade) {
//         const nome = faker.location.city();       // Cidade
//         const estado = faker.location.state();    // Estado
//         const pais = faker.location.country();    // País
//         const data = faker.date.future().toISOString().split('T')[0]; // YYYY-MM-DD
//         const horario = faker.date.recent().toTimeString().split(' ')[0]; // HH:MM:SS
//         const temperatura = faker.number.int({ min: -30, max: 50 });

//         const chaveUnica = `${nome}-${estado}-${pais}`;

//         if (!locaisGerados.has(chaveUnica)) {
//             locaisGerados.add(chaveUnica);
//             registros.push({ nome, estado, pais, data, horario, temperatura });
//         }
//     }

//     let inseridos = 0;

//     for (const registro of registros) {
//         try {
//             const [status, resposta] = await criandoLocalETemperatura(
//                 registro.nome,
//                 registro.estado,
//                 registro.pais,
//                 registro.data,
//                 registro.horario,
//                 registro.temperatura
//             );

//             if (status === 201) {
//                 inseridos++;
//             } else {
//                 console.error("Erro ao inserir:", resposta);
//             }
//         } catch (error) {
//             console.error("Erro ao inserir registro:", error);
//         }
//     }

//     console.log(`${inseridos} registros inseridos com sucesso!`);
// };

// gerarRegistros(1000);