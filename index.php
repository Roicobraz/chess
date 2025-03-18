<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link id="style_css" rel="stylesheet" href="style.css">
    <title>&Eacute;chiquier</title>
</head>

<body id="page" class="">
    <header>

    </header>
    <main class="container">
        <div id="content">
            <div class="chess">
                <?php
                    $chess = "";
                    for ($i="A"; $i <= "H"; $i++) { 
                        $chess .= "<div class='ligne'>";
                        for ($j=8; $j > 0; $j--) { 
                            $chess .= "<div id='{$i}{$j}'></div>";
                        }
                        $chess .= "</div>";
                    }
                    echo($chess);
                ?>
            </div>
    </main>
    <footer>
        <script type="module" src="js/chess.js"></script>
    </footer>
</body>

</html>