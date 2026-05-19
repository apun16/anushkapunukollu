/** Opens the user's mail client with a pre-filled resume request.
 * Uses encodeURIComponent (spaces → %20) so clients don't show "+" instead of spaces. */
const subject = encodeURIComponent('Resume request — [Your name]');
const body = encodeURIComponent(
  [
    'Hi Anushka,',
    '',
    "I'm reaching out to request a copy of your resume. [Add a sentence of context: role, company, program, or how we connected.]",
    '',
    'Thank you,',
    '[Your name]',
    '[Optional: LinkedIn profile or best email to reach you]',
  ].join('\n'),
);

export const RESUME_REQUEST_MAILTO = `mailto:anushka.punukollu@uwaterloo.ca?subject=${subject}&body=${body}`;
