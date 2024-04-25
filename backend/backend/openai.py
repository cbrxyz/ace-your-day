from openai import OpenAI

from .settings import OPENAI_API_KEY


class EventyAI(OpenAI):
    def __init__(self):
        super().__init__(api_key=OPENAI_API_KEY)

    def get_response(self, message: str):
        return self.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "Please optimize the following schedule and return it an HTML table format, but do not format it in a codeblock. Literally just output the raw HTML. Events with flexible = true can be moved, but events with flexible=false cannot. You can only schedule events that I provide to you. DO NOT MAKE UP EVENTS.",
                },
                {
                    "role": "user",
                    "content": message,
                },
            ],
            model="gpt-4-turbo",
        )
