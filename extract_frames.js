import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import fs from 'fs';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputPath = 'AI_robot.mp4';
const outputDir = 'client/public/frames_robot';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Extracting frames from ' + inputPath + ' to ' + outputDir + '...');

ffmpeg(inputPath)
  .outputOptions([
    '-vf', 'fps=24,scale=1280:-1', // 24 fps, resize width to 1280px to save space
  ])
  .output(`${outputDir}/frame_%04d.webp`)
  .on('end', () => console.log('✅ Frames extracted successfully!'))
  .on('error', (err) => console.error('❌ Error extracting frames:', err))
  .run();