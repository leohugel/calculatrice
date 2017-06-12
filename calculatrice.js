calc_array = new Array();
var calcul=0;
var pas_ch=0;
function $id(id)
{
        return document.getElementById(id);
}
function f_calc(id,n)
{
        if(n=='ce')
        {
                initialiser_calc(id);
        }
        else if(n=='=')
        {
                if(calc_array[id][0]!='=' && calc_array[id][1]!=1)
                {
                        eval('calcul='+calc_array[id][2]+calc_array[id][0]+calc_array[id][3]+';');
                        calc_array[id][0] = '=';
                        $id(id+'_resultat').value=calcul;
                        calc_array[id][2]=calcul;
                        calc_array[id][3]=0;
                }
        }
        else if(n=='+-')
        {
                $id(id+'_resultat').value=$id(id+'_resultat').value*(-1);
                if(calc_array[id][0]=='=')
                {
                        calc_array[id][2] = $id(id+'_resultat').value;
                        calc_array[id][3] = 0;
                }
                else
                {
                        calc_array[id][3] = $id(id+'_resultat').value;
                }
                pas_ch = 1;
        }
		else if(n=='xx')
		{
				$id(id+'_resultat').value=$id(id+'_resultat').value*$id(id+'_resultat').value;
		}
		else if(n=='x!')
		{
				if($id(id+'_resultat').value <= 0)
				{
					$id(id+'_resultat').value='ERROR';
				}
				else{
					for(i=($id(id+'_resultat').value)-1;i>=1;i--)
					{
						$id(id+'_resultat').value=$id(id+'_resultat').value*i;
					}
				}
		}
		else if(n=='nb_terme')
		{
				if($id(id+'_resultat').value <= 0)
				{
					$id(id+'_resultat').value='ERROR';
				}
				else{
					var nt=0;
					var unieme=$id(id+'_resultat').value;
					while (unieme!=1)
					{
						++nt;
						if((unieme%2)==0)
						{
							unieme = unieme/2;
						}
						else
						{
							unieme = 3*unieme+1;
						}
					}
					++nt;
					$id(id+'_resultat').value=nt;
				}
		}
		else if(n=='max_terme')
		{
				if($id(id+'_resultat').value <= 0)
				{
					$id(id+'_resultat').value='ERROR';
				}
				else{
					var tmax=$id(id+'_resultat').value;
					var unieme=$id(id+'_resultat').value;
					while (unieme!=1)
					{
						if ((unieme%2)==0)
						{
							unieme = unieme/2;
						}
						else
						{
							unieme = 3*unieme+1;
						}
						if(tmax<unieme)
						{
							tmax = unieme;
						}
					}
					$id(id+'_resultat').value=tmax;
				}
		}
        else if(n=='nbs')
        {
                if($id(id+'_resultat').value<10 && $id(id+'_resultat').value>-10)
                {
                        $id(id+'_resultat').value=0;
                }
                else
                {
                        $id(id+'_resultat').value=$id(id+'_resultat').value.slice(0,$id(id+'_resultat').value.length-1);
                }
                if(calc_array[id][0]=='=')
                {
                        calc_array[id][2] = $id(id+'_resultat').value;
                        calc_array[id][3] = 0;
                }
                else
                {
                        calc_array[id][3] = $id(id+'_resultat').value;
                }
        }
        else
        {
                        if(calc_array[id][0]!='=' && calc_array[id][1]!=1)
                        {
                                eval('calcul='+calc_array[id][2]+calc_array[id][0]+calc_array[id][3]+';');
                                $id(id+'_resultat').value=calcul;
                                calc_array[id][2]=calcul;
                                calc_array[id][3]=0;
                        }
                        calc_array[id][0] = n;
        }
        if(pas_ch==0)
        {
                calc_array[id][1] = 1;
        }
        else
        {
                pas_ch=0;
        }
        document.getElementById(id+'_resultat').focus();
        return true;
}
function add_calc(id,n)
{
        if(calc_array[id][1]==1)
        {
                $id(id+'_resultat').value=n;
        }
        else
        {
                $id(id+'_resultat').value+=n;
        }
        if(calc_array[id][0]=='=')
        {
                calc_array[id][2] = $id(id+'_resultat').value;
                calc_array[id][3] = 0;
        }
        else
        {
                calc_array[id][3] = $id(id+'_resultat').value;
        }
        calc_array[id][1] = 0;
        document.getElementById(id+'_resultat').focus();
        return true;
}
function initialiser_calc(id)
{
        $id(id+'_resultat').value=0;
        calc_array[id] = new Array('=',1,'0','0',0);
        document.getElementById(id+'_resultat').focus();
        return true;
}

//Pour ecrire directement avec le clavier avec les codes ASCI
function key_detect_calc(id,evt)
{
        if((evt.keyCode>95) && (evt.keyCode<106))
        {
                var nbr = evt.keyCode-96;
                add_calc(id,nbr);
        }
        else if((evt.keyCode>47) && (evt.keyCode<58))
        {
                var nbr = evt.keyCode-48;
                add_calc(id,nbr);
        }
        else if(evt.keyCode==107)
        {
                f_calc(id,'+');
        }
        else if(evt.keyCode==109)
        {
                f_calc(id,'-');
        }
        else if(evt.keyCode==106)
        {
                f_calc(id,'*');
        }
        else if(evt.keyCode==111)
        {
                f_calc(id,'/');
        }
        else if(evt.keyCode==110)
        {
                add_calc(id,'.');
        }
        else if(evt.keyCode==190)
        {
                add_calc(id,'.');
        }
        else if(evt.keyCode==188)
        {
                add_calc(id,'.');
        }
        else if(evt.keyCode==13)
        {
                f_calc(id,'=');
        }
        else if(evt.keyCode==46)
        {
                f_calc(id,'ce');
        }
        else if(evt.keyCode==8)
        {
                f_calc(id,'nbs');
        }
        else if(evt.keyCode==27)
        {
                f_calc(id,'ce');
        }
        return true;
}