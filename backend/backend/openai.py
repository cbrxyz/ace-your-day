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
                    "content": "You are a helpful assistant.",
                },
                {
                    "role": "user",
                    "content": message,
                },
            ],
            model="gpt-3.5-turbo",
        )
