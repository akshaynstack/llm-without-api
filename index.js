import {FilesetResolver, LlmInference} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai';

const input = document.getElementById('input');
const output = document.getElementById('output');
const submit = document.getElementById('submit');

const modelFileName = 'llm_task/gemma-2b-it-gpu-int4.bin'; 

/**
 * Display newly generated partial results to the output text box.
 */
function displayPartialResults(partialResults, complete) {
  output.textContent += partialResults;

  if (complete) {
    if (!output.textContent) {
      output.textContent = 'Result is empty';
    }
    submit.disabled = false;
  }
}

/**
 * Main function to run LLM Inference.
 */
async function runDemo() {
  const genaiFileset = await FilesetResolver.forGenAiTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai/wasm');
  let llmInference;

  submit.onclick = () => {
    output.textContent = '';
    submit.disabled = true;
    llmInference.generateResponse(input.value, displayPartialResults);
  };

  submit.value = 'Loading the model...'
  LlmInference
      .createFromOptions(genaiFileset, {
        baseOptions: {modelAssetPath: modelFileName},
        // maxTokens: 512,  // The maximum number of tokens (input tokens + output
        //                  // tokens) the model handles.
        // randomSeed: 1,   // The random seed used during text generation.
        // topK: 1,  // The number of tokens the model considers at each step of
        //           // generation. Limits predictions to the top k most-probable
        //           // tokens. Setting randomSeed is required for this to make
        //           // effects.
        // temperature:
        //     1.0,  // The amount of randomness introduced during generation.
        //           // Setting randomSeed is required for this to make effects.
      })
      .then(llm => {
        llmInference = llm;
        submit.disabled = false;
        submit.value = 'Get Response'
      })
      .catch(() => {
        alert('Failed to initialize the task.');
      });
}

runDemo();