import os
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = "static/uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload-scan", methods=["POST"])
def upload_scan():

    file = request.files.get("scan")

    if not file:
        return render_template(
            "imaging.html",
            report="No file selected."
        )

    filename = secure_filename(file.filename)

    save_path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    file.save(save_path)

    report = """
Findings highly suggestive of
Polycystic Kidney Disease.

Multiple cystic lesions observed.

Kidney enlargement detected.

Recommendation:
Consult nephrology specialist.
"""

    return render_template(
        "imaging.html",
        filename=filename,
        report=report
    )


@app.route("/imaging")
def imaging():
    return render_template("imaging.html")
